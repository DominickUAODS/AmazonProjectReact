import React, { useRef } from 'react';

interface CodeInputProps {
	length?: number;
	inputClassName: string;
	wrapperClassName: string;
	onComplete?: (code: string) => void;
	onChange?: (code: string) => void;
}

export default function CodeInput({ length = 6, inputClassName, wrapperClassName, onComplete, onChange }: CodeInputProps) {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	// added func
	const updateCode = () => {
		const code = inputsRef.current.map((input) => input?.value || '').join('');
		if (onChange) onChange(code);
		if (code.length === length && onComplete) {
			onComplete(code);
		}
	};

	const handleChange = (index: number, value: string) => {
		//if (!/^[0-9a-zA-Z]?$/.test(value)) return;
		if (!/^[0-9]?$/.test(value)) return;
		if (value.length > 1) return;

		const input = inputsRef.current[index];
		if (input) input.value = value;

		if (value && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}

		// const code = inputsRef.current.map((input) => input?.value || '').join('');
		// if (code.length === length && onComplete) {
		// 	onComplete(code);
		// }

		updateCode();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		// if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
		// 	inputsRef.current[index - 1]?.focus();
		// }

		if (e.key === 'Backspace') {
			const input = inputsRef.current[index];

			// если поле не пустое — просто очищаем
			if (input && input.value) {
				input.value = '';
			} else if (index > 0) {
				// если пустое и не первое — чистим предыдущее и переводим туда фокус
				const prevInput = inputsRef.current[index - 1];
				if (prevInput) {
					prevInput.value = '';
					prevInput.focus();
				}
			}
			updateCode();
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