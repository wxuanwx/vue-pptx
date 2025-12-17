import { DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions, PropType } from 'vue';
declare const _default: DefineComponent<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    src: string | Blob;
    requestOptions?: any;
    options?: {
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
}>, {
    requestOptions: () => {};
}>>, {
    preview: () => Promise<void>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    rendered: (params: any) => void;
    error: (params: any) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    src: string | Blob;
    requestOptions?: any;
    options?: {
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
}>, {
    requestOptions: () => {};
}>>> & Readonly<{
    onError?: ((params: any) => any) | undefined;
    onRendered?: ((params: any) => any) | undefined;
}>, {
    requestOptions: any;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
