/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */

import AppBar from "./";

export const withAppBar = (WrappedComponent: any) => {
    return (props: any) => <>
        <AppBar />
        <WrappedComponent {...props}/>
    </>
}
