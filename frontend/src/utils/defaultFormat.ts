import type { PostType } from "../hooks/queryHooks/useFetch";

export const defaultImgURL = 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg'


export type propsTypes = {
    categoryTITLE: string,
    data: PostType[]
};

export const defaultCategoryFormat = (props: propsTypes) => {
    return {
        title: props.categoryTITLE ?? "TITLE HERE",
        subtitle: "Category",
        cards: {
            left: {
                image: props.data?.[1]?.imageUrl ?? defaultImgURL,
                title: props.data?.[1]?.title ?? "TITLE HERE",
                gradient: 'bg-gradient-to-br from-purple-900 to-purple-800'
            },
            center: {
                image: props.data?.[0]?.imageUrl ?? defaultImgURL,
                title: props.data?.[0]?.title ?? "TITLE HERE",
                gradient: 'bg-gradient-to-br from-amber-900 to-amber-800'
            },
            right: {
                image: props.data?.[2]?.imageUrl ?? defaultImgURL,
                title: props.data?.[2]?.title ?? "TITLE HERE",
                tag: `+ ${props.data?.[2]?.tags ?? 'tags'}`,
                gradient: 'bg-gradient-to-br from-blue-900 to-blue-800'
            }
        }
    }
};