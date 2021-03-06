import {SearchPanel} from './search-panel'
import {List} from './list'
import {cleanObject, useMount,useDebounce} from '../../utils'
import{useState,useEffect} from 'react'
import * as qs from 'qs'
const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScrren =()=>{
    const [users,setUsers]=useState([])
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const [list,setList]=useState([]);
    const debouncedParam=useDebounce(param,200)
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res=>{
            if(res.ok){
                setList(await res.json())
            }
        })
    },[debouncedParam])
   useMount(()=>{
       fetch(`${apiUrl}/users`).then(async res=>{
           if(res.ok){
               setUsers(await res.json())
           }
       })
   })
   return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}