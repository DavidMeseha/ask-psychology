import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const DynamicHeightTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textareaRef.current!, []);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", adjustHeight);
      return () => textarea.removeEventListener("input", adjustHeight);
    }, []);

    return <textarea ref={textareaRef} {...props} />;
  }
);

DynamicHeightTextArea.displayName = "DynamicHeightTextArea";

export default DynamicHeightTextArea;
