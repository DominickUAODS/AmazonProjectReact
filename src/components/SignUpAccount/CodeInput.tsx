import React, { useRef } from 'react';

interface CodeInputProps {
  length?: number;
  inputClassName: string;
  wrapperClassName: string;
  onComplete?: (code: string) => void;
}

export default function CodeInput({
  length = 6,
  inputClassName,
  wrapperClassName,
  onComplete,
}: CodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;
    if (value.length > 1) return;

    const input = inputsRef.current[index];
    if (input) input.value = value;

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const code = inputsRef.current.map((input) => input?.value || '').join('');
    if (code.length === length && onComplete) {
      onComplete(code);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={wrapperClassName}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={inputClassName}
        />
      ))}
    </div>
  );
}