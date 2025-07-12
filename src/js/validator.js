const validateSchema = {
	email: {
		isRequired: { message: "Обязательное поле" },
		isEmail: { message: "Введите корректный email" },
	},
	password: {
		isRequired: { message: "Обязательное поле" },
		isCorrectPassword: {
			message: "Пароль должен содержать хотя бы 1 букву и 1 цифру",
		},
		min: { message: "Минимум 6 символов", value: 6 },
		max: { message: "Максимум 16 символов", value: 16 },
	},
	confirmPassword: {
		checkPassword: {
			message: "Пароли не совпадают",
			ref: "password",
		},
	},
};

const validateRules = {
	isRequired: (value) => {
		return Boolean(value.trim());
	},
	min: (value, min) => {
		return value.length >= min;
	},
	max: (value, max) => {
		return value.length <= max;
	},
	isEmail: (value) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	},
	isCorrectPassword: (value) => {
		return /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).*$/.test(value);
	},
	checkPassword: (value, _, password) => {
		return value === password;
	},
};

export const validator = (values) => {
	const error = {};

	for (const name in values) {
		const currentRules = validateSchema[name];
		for (const rule in currentRules) {
			const { message, value, ref } = currentRules[rule];
			const validate = validateRules[rule];
			const hasError =
				validate && !validate(values[name], value, values[ref]);
			if (hasError) {
				error[name] = message;
				break;
			}
		}
	}

	return error;
};
