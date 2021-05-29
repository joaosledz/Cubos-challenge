export const dateToLocale = (oldDate: string) => {
    const aux = oldDate.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
};

export const timeCalculator = (runtime: number) => {
    const hour = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hour}h ${minutes}min`;
};

export const isYear = (str: string) => {
    return /^[1|2][0-9]{3}/.test(str);
};

export const Translate = (str: string) => {
    switch (str) {
        case 'English':
            return 'Inglês';
        case 'Released':
            return 'Lançado';
        default:
            return str;
    }
};
