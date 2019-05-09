
export interface IUser {
    _id: string,
    fullName: string,
    email: string,
    avatar: any
}

export interface IUser {
    _id: string,
    fullName: string,
    email: string,
    avatar: {
        url: string
    },
    posts: [{
        _id: string,
        title: string,
        description: string,
        picture: {
            url: string
        }
    }]
}

export interface IPost {
    _id: string,
    title: string,
    description: string,
    picture: IPicture,
    author: IUser,
    price: number
}

export interface IPicture {
    _id: string,
    url: string
}

export interface IPurchase {
    post: string | IPost,
    buyer: string
}
