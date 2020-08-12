import { toast, cssTransition } from "react-toastify";

const customTransition = cssTransition({
  enter: "toastEnter",
  exit: "toastExit",
  duration: [250, 100],
  collapse: true,
  collapseDuration: 0,
});

const options = {
  transition: customTransition,
};

function preToastTrigger() {
  toast.dismiss();
  toast.clearWaitingQueue();
}

export const Notify = {
  error(message: string) {
    preToastTrigger();
    toast.error(message, options);
  },
  success(message: string) {
    preToastTrigger();
    toast.success(message, options);
  },
  warning(message: string) {
    preToastTrigger();
    toast.warning(message, options);
  },
  info(message: string) {
    preToastTrigger();
    toast.info(message, options);
  },
};
