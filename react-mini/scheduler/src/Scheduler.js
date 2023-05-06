import { frameYieldMs } from "./SchedulerFeatureFlags";
import { peek, pop, push } from "./SchedulerMinHeap";
import { unstable_NormalPriority } from "./SchedulerPriorities";
import { unstable_LowPriority } from "./SchedulerPriorities";
import { unstable_IdlePriority } from "./SchedulerPriorities";
import { unstable_UserBlockingPriority } from "./SchedulerPriorities";
import { unstable_ImmediatePriority } from "./SchedulerPriorities";

let taskIdCounter = 1;
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
const maxSigned31BitInt = 1073741823;
const IMMEDIATE_PRIORITY_TIMEOUT = -1;
const USER_BLOCKING_PRIORITY_TIMEOUT = 250;
const NORMAL_PRIORITY_TIMEOUT = 5000;
const LOW_PRIORITY_TIMEOUT = 10000;
const IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
// 任务队列, 最小堆, 优先级最高(sortIndex小的)的任务在堆顶
const taskQueue = [];
let currentTask = null;
let currentPriorityLevel = unstable_NormalPriority;
let isPerformingWork = false;
let isHostCallbackScheduled = false;
let isMessageLoopRunning = false;
let scheduledHostCallback = null;
let startTime = -1;
let frameInterval = frameYieldMs;

export const getCurrentTime = () => performance.now();

export function unstable_scheduleCallback(priorityLevel, callback, options) {
  const currentTime = getCurrentTime();
  let startTime;
  if (typeof options === "object" && options !== null) {
    // todo
  } else {
    startTime = currentTime;
  }

  let timeout;
  switch (priorityLevel) {
    case unstable_ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;
      break;
    case unstable_UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
      break;
    case unstable_IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;
      break;
    case unstable_LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;
      break;
    case unstable_NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT;
      break;
  }
  const expirationTime = startTime + timeout;

  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };

  if (startTime > currentTime) {
    // todo
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }
}

export function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    // 如果上一个task执行时间小于5ms, 不让出主线程
    return false;
  }
  if (false) {
    // navigator.scheduling.isInputPending这个api暂时不支持
    // 所以这里的逻辑暂时用不上
    return navigator.scheduling.isInputPending();
  }
  return true;
}

const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime();
    startTime = currentTime;
    const hasTimeRemaining = true;
    let hasMoreWork = true;
    // scheduledHostCallback = flushWork
    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
    if (hasMoreWork) {
      // 如果taskQueue中还有任务, 新开启一个宏任务
      schedulePerformWorkUntilDeadline();
    } else {
      isMessageLoopRunning = false;
      scheduledHostCallback = null;
    }
  } else {
    isMessageLoopRunning = false;
  }
};

// 这一步是利用了宏任务的执行时机, 来异步执行performWorkUntilDeadline函数
// 并且可以实现给微任务让步的功能(可中断渲染)
let schedulePerformWorkUntilDeadline;
if (typeof setImmediate === "function") {
  // 老版本的ie和nodejs环境下
  schedulePerformWorkUntilDeadline = () => {
    setImmediate(performWorkUntilDeadline);
  };
} else if (typeof MessageChannel === "function") {
  // 现代浏览器下
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null);
  };
} else {
  // 最后用setTimeout(有4ms的延迟)
  schedulePerformWorkUntilDeadline = () => {
    setTimeout(performWorkUntilDeadline, 0);
  };
}
function requestHostCallback(callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    // 开启宏任务循环执行taskQueue中的任务
    schedulePerformWorkUntilDeadline();
  }
}

function flushWork(hasTimeRemaining, initialTime) {
  isHostCallbackScheduled = false;
  isPerformingWork = true;
  const previousPriorityLevel = currentPriorityLevel;
  try {
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    // 即使上面return了, 这里的代码还是会执行
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  currentTask = peek(taskQueue);
  while (currentTask !== null) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // 如果当前任务还没有到期, 并且需要让出主线程给优先级更高的任务
      // 就退出循环
      break;
    }
    // currentTask.callback = performConcurrentWorkOnRoot
    const callback = currentTask.callback;
    if (typeof callback === "function") {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
      if (typeof continuationCallback === "function") {
        // 继续中断的Fiber树构造
        currentTask.callback = continuationCallback;
      } else {
        // Fiber树构造没有被中断, 构造完成
        // todo: 感觉这个判断有点多余呢
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }
    } else {
      // todo: 这里什么情况下会进入呢
      pop(taskQueue);
    }
    // 更新currentTask, 继续循环
    currentTask = peek(taskQueue);
  }
  if (currentTask !== null) {
    // 因为需要让出主线程而停止循环, taskQueue中的任务并没有执行完
    return true;
  } else {
    // taskQueue中的任务全都执行完成了
    return false;
  }
}
