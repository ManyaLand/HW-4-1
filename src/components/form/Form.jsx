import React, { useRef, useEffect, useState } from "react";
import { Input } from "../input/Input";
import style from "./Form.module.css";
import { validator } from "../../js/validator";

export const Form = () => {
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState({});
	const buttonRef = useRef(null);
	const changeForm = (e) => {
		const { value, name } = e.target;
		setUserForm({ ...userForm, [name]: value });
	};
	const validate = () => {
		const error = validator(userForm);
		setError(error);
		return Object.keys(error).length === 0;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isValid) return;
		console.log(userForm);
	};
	const isValid = Object.keys(error).length === 0;
	useEffect(() => {
		validate();
	}, [userForm]);
	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	return (
		<form className={style.form} onSubmit={handleSubmit}>
			<Input
				name="email"
				label="Почта"
				placeholder="Введите почту"
				value={userForm.email}
				onChange={changeForm}
				error={error?.email}
				type="text"
			></Input>
			<Input
				name="password"
				label="Пароль"
				placeholder="Введите пароль"
				value={userForm.password}
				onChange={changeForm}
				error={error?.password}
				type="password"
			></Input>
			<Input
				name="confirmPassword"
				label="Подверждение пароля"
				placeholder="Подтвердите пароль"
				value={userForm.confirmPassword}
				onChange={changeForm}
				error={error?.confirmPassword}
				type="password"
			></Input>
			<button
				ref={buttonRef}
				disabled={!isValid}
				className={style.button}
				type="submit"
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
