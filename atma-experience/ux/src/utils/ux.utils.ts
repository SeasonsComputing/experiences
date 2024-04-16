import { ReactNode } from 'react'

export type ContainerProps = {
  children?: ReactNode
}

export const setTranslateX = (e: any, pos: number): void => {
  e.style.transform = `translateX(${pos}px)`;
}

export const getTranslateX = (e: any): number => {
  const style = window.getComputedStyle(e);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return matrix.m41;
}

export const setTranslateY = (e: any, pos: number): void => {
  e.style.transform = `translateY(${pos}px)`;
}

export const getTranslateY = (e: any): number => {
  const style = window.getComputedStyle(e);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return matrix.m42;
}

export const formatDateTime = (when: string): string => new Date(Date.parse(when)).toLocaleString();
export const formatPercentage = (num: number): string => (num * 100) + '%';

export const formatPrice = (price: number, currency: string): string => {
  const { format } = Intl.NumberFormat(undefined, { style: 'currency', currency });
  return format(price);
}

const ux = {
  setTranslateX, 
  getTranslateX,
  setTranslateY, 
  getTranslateY,
  formatDateTime, 
  formatPercentage, 
  formatPrice
}

export default ux