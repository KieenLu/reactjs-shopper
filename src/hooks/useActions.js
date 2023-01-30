import { MESSAGE } from "@/config/message";
import { handleError } from "@/utils/handleError";
import { message } from "antd";
import { useId, useRef } from "react";

export const useAction = ({
  action,
  messageSuccess = MESSAGE.SUCCESS_MESSAGE,
  messageLoading = MESSAGE.LOADING_MESSAGE,
  onSuccess,
}) => {
  const loadingRef = useRef(false);
  const key = useId();
  const onAction = async (...data) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    try {
      message.loading({
        content: messageLoading,
        key,
        duration: 1.5,
      });
      await action(...data);
      if (messageSuccess) {
        message.success({
          key,
          content: messageSuccess,
          duration: 2,
        });
      } else {
        message.destroy(key);
      }

      onSuccess?.();
    } catch (err) {
      handleError(err, key);
    }
    loadingRef.current = false;
  };

  return onAction;
};
