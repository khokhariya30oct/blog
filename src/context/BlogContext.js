import createDataContext  from '../context/createDataContext';



const blogReducer = (state,action) => {
    switch(action.type) {
        case 'ADD_BLOG':
            return [...state,{
                id : Math.floor(Math.random() * 9999),
                title : `Blog ${state.length + 1}`
            }];

        case 'DELETE_BOLG':
            return state.filter((blogPost) => blogPost.id !== action.payload)

        case 'ADD_BLOG_DYNAMIC':
            return [...state,{
                id : Math.floor(Math.random() * 9999),
                title : action.payload.title,
                content : action.payload.content
            }]
        case 'UPDATE_BLOG_DYNAMIC':
            return state.map((blog) => {
                if (blog.id === action.payload.id) {
                    return action.payload;
                }
                else{
                    return blog;
                }
            })
        default :
            return state
    }
}

const deletePost = (dispatch) => {
    return (id) => {
        dispatch({type : 'DELETE_BOLG', payload : id})
    }
}


const addBlogPosts = (dispatch) => {
    return () => {
        dispatch({type : 'ADD_BLOG'});
    }
}

const addBlogPostDynamicContent = (dispatch) => {
    return (title,content,callback) => {
        dispatch({type : 'ADD_BLOG_DYNAMIC', payload : {title,content}});
        callback();
    }
}


const updateBlogPost = (dispatch) => {
    return (blog,callback) => {
        dispatch({type : 'UPDATE_BLOG_DYNAMIC',
            payload : {
                id : blog.id,
                title : blog.title,
                content : blog.content
            }
        });
        callback();
    }
}


export const {Context,Provider} = createDataContext(
    blogReducer,
    {addBlogPosts,deletePost,addBlogPostDynamicContent,updateBlogPost},
    []
    );
