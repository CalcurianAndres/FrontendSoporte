export interface fechasReporte{
    desde:string;
    hasta:string;
}
export interface Chequeo{
    _id         :string;
    descripcion :string;
    estado      :boolean;
    fecha       :Date;
}

export interface Monitors{
    Monitors : Chequeo[];
}