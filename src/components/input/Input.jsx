import style from "./Input.module.css";

export const Input = ({ name, label, error, ...props }) => {
	return (
		<div className={style.inputContainer}>
			<label htmlFor={name}>{label}</label>
			<input className={style.input} name={name} {...props} />
			{error && <span className={style.error}>{error}</span>}
		</div>
	);
};
