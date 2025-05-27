import { ClassSimple } from "./classsimple";

export interface Subject {
id: number;
title: string;
teacher: number;
classes: Array<ClassSimple>
}

