import React, { useRef, useEffect } from "react";
import { Input } from "../input/Input";
import style from "./Form.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
	const validateSchema = yup.object().shape({
		email: yup
			.string()
			.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Введите корректный email")
			.required("Обязательное поле"),
		password: yup
			.string()
			.matches(
				/^(?=.*[A-Za-zА-Яа-я])(?=.*\d).*$/,
				"Пароль должен содержать хотя бы 1 букву и 1 цифру",
			)
			.required("Обязательное поле"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Пароли не совпадают"),
	});
	const buttonRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(validateSchema),
	});
	const onSubmit = (data) => {
		if (!isValid) return;
		console.log(data);
	};
	useEffect(() => {
		if (isValid && buttonRef.current) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	return (
		<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register("email")}
				name="email"
				label="Почта"
				placeholder="Введите почту"
				error={errors.email?.message}
				type="text"
			></Input>
			<Input
				{...register("password")}
				name="password"
				label="Пароль"
				placeholder="Введите пароль"
				error={errors.password?.message}
				type="password"
			></Input>
			<Input
				{...register("confirmPassword")}
				name="confirmPassword"
				label="Подтверждение пароля"
				placeholder="Подтвердите пароль"
				error={errors.confirmPassword?.message}
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
