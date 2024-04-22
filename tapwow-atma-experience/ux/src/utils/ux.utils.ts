import { ReactNode } from 'react'

export type ContainerProps = {
  children?: ReactNode
}

const setRef = (ref: any, val: any) => ref.current = val;
const getRef = (ref: any) => ref.current;

const utils = {
  setRef,
  getRef
}

export default utils