export const formatDateShort = (value) => {
	return new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	}).format(new Date(value));
}


export const formatDataAgo = (value) => {
	// time ago from date
	const timeAgo = new Date(value).getTime();
	const now = new Date().getTime();
	const diff = now - timeAgo;
	const seconds = diff / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const months = days / 30;
	const years = months / 12;
	if (seconds < 60) {
		return `${Math.round(seconds)} segundos`;
	}
	if (minutes < 60) {
		return `${Math.round(minutes)} minutos`;
	}
	if (hours < 24) {
		return `${Math.round(hours)} horas`;
	}
	if (days < 30) {
		return `${Math.round(days)} dias`;
	}
	if (months < 12) {
		return `${Math.round(months)} meses`;
	}
	return `${Math.round(years)} años`;
}