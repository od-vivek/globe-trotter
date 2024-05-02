import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import BlogCard from './BlogCard';
import baseurl from '../api/baseurl';

const BlogsList = () => {

    const [blogs, setBlogs] = useState([]);
    const [isBlogChanged, setIsBlogChanged] = useState(false)
    useEffect(()=> {
        const fetchData = async()=>{
            const res = await axios.get(baseurl + "/api/admin/blogs")
    
            if(res?.status === 200){
                setBlogs(res?.data)
            }
        }
        fetchData();
    }, [isBlogChanged])
    return (
        <div>
            {blogs.map((blog, id) => <BlogCard blog={blog} isBlogChanged={isBlogChanged} setIsBlogChanged={setIsBlogChanged} key={id}/>)}
        </div>
    )
}

export default BlogsList