import createDataContext  from '../context/createDataContext';
import jsonserver from '../api/jsonserver';
import axios from 'axios';


const blogReducer = (state,action) => {
    switch(action.type) {

        case 'GET_BLOGPOST' :
            return action.payload;

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

const getBlogPost = (dispatch) => {
    return async () => {
        const res = await jsonserver.get('/blogposts');
        dispatch({type : 'GET_BLOGPOST',payload : res.data})
    }
}

const deletePost = (dispatch) => {
    return async (id) => {
        await jsonserver.delete(`/blogposts/${id}`);
        dispatch({type : 'DELETE_BOLG', payload : id})
    }
}

const addBlogPosts = (dispatch) => {
    return () => {
        dispatch({type : 'ADD_BLOG'});
    }
}

const addBlogPostDynamicContent = (dispatch) => {
    return async (title,content,callback) => {
        // dispatch({type : 'ADD_BLOG_DYNAMIC', payload : {title,content}});
        // callback();
        await jsonserver.post('/blogposts',{title,content});
        if (callback){
            callback();
        }

    }
}


const updateBlogPost = (dispatch) => {
    return async (blog,callback) => {
        await jsonserver.put(`/blogposts/${blog.id}`,{title : blog.title,content : blog.content});
        dispatch({type : 'UPDATE_BLOG_DYNAMIC',
            payload : {
                id : blog.id,
                title : blog.title,
                content : blog.content
            }
        });
        if(callback) {
            callback();
        }
    }
}


export const {Context,Provider} = createDataContext(
    blogReducer,
    {getBlogPost,addBlogPosts,deletePost,addBlogPostDynamicContent,updateBlogPost},
    []
    );
