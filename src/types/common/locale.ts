interface Tab {
    all: string;
    nowDriving: string;
    rest: string;
    accident: string;
}

interface Table {
    vehiclesName: string;
    date: string;
    location: string[];
    duration: string;
    speed: string;
    status: string;
    rpm: string;
    contents: string;
    tag: string;
    inner: InnerTable;
}

interface InnerTable {
    startAt: string;
    startLocation: string;
    endedAt: string;
    endLocation: string;
    distance: string;
    trip: string;
}

interface Placeholder {
    vehiclesSearch: string;
}

interface Unit {
    numberOfCases: string;
}

interface Button {
    driveManage: string;
}

interface Menus {
    driveStatus: string;
}

interface Currency {
    style: string;
    currency: string;
    notation: string;
}

export interface LanguageDetails {
    button: Readonly<Button>;
    tab: Readonly<Tab>;
    table: Readonly<Table>;
    menus: Readonly<Menus>;
    placeholder: Readonly<Placeholder>;
    unit: Readonly<Unit>;
}

export interface NumberFormats {
    currency: Currency;
}
