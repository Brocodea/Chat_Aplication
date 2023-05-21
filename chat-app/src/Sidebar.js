import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'> 
    <div className="sideber_header">
    <Avatar />
      <div className="sideber_headerRight">
      <IconButton>
        <DonutLargeIcon/>
      </IconButton>
     <IconButton>
        <ChatIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
       
      </div>
    </div>
    <div className='search'>
    <div className='sideber_searchIncon'>
    <SearchIcon/>
      <input placeholder='Search or start new chat' type="text"></input>
      </div>
    </div>


    <div className='sideber_chats'>
    <SidebarChat />
    <SidebarChat />
    <SidebarChat />

    </div>
      
    </div>
  )
}

export default Sidebar
