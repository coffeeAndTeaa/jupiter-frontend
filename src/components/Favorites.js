import React from 'react';
import { Menu, Button, Drawer, message } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import { getFavoriteItem } from '../utils';

const {SubMenu} = Menu;
const MenuKey = {
    Streams : 'streams',
    Videos : 'videos',
    Clips : 'clips'
}

class Favorties extends React.Component {
    state = {
        dispalyDrawer : false,
        data : {
            VIDEO : [],
            STREAM : [],
            CLIP : [],
        }
    }

    onDrawerClose = () => {
        this.setState({
          displayDrawer: false,
        })
      }

    onFavoriteClick = () => {
        getFavortieItem().
        then( 
            (data) => {
                this.setState({
                    data,
                    dispalyDrawer : true,
                })
            }).catch(
                (err) => {
                    message.error(err.message);
                }
            )
    }

    render = () => {
        const {VIDEO, STREAM, CLIP} = this.state.data;
        
        return (
            <>
                <Button 
                    type="primary"
                    shape="round"
                    onClick={this.onFavoriteClick}
                    icon={<StarFilled/>}
                >My favorite
                </Button>
                <Drawer
                    title="My Favorites"
                    placement="right"
                    width={720}
                    visible={this.state.displayDrawer}
                    onClose={this.onDrawerClose}          
                >
                    <Menu
                        mode="inline"
                        defaultOpenKeys={[MenuKey.Streams]}
                        style={{ height: '100%', borderRight: 0 }}
                        selectable={false}
                    >
                        <SubMenu
                            key={MenuKey.Streams} 
                            icon={<EyeOutlined />}
                        >
                                {
                                    STREAM.map(
                                        (item) => {
                                            return (
                                                <Menu.Item key = {item.id}>
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        {`${item.broadcaster_name} - ${item.title}`}
                                                    </a>
                                                </Menu.Item>
                                            )
                                        }
                                    )
                                }
                        </SubMenu>
                        <SubMenu key={MenuKey.Videos} icon={<YoutubeOutlined />} title="Videos">
                        {
                            VIDEO.map((item) => {
                            return (
                                <Menu.Item key={item.id}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {`${item.broadcaster_name} - ${item.title}`}
                                </a>
                                </Menu.Item>
                                )
                            })
                        }
                        </SubMenu>
                        <SubMenu key={MenuKey.Clips} icon={<YoutubeOutlined />} title="Videos">
                        {
                            CLIP.map(
                                (item) => {
                                    return (
                                        <Menu.Item key={item.id}>
                                             <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                 {`${item.broadcaster_name} - ${item.title}`}
                                             </a>
                                        </Menu.Item>
                                    )
                                }
                            )
                        }
                        </SubMenu>

                    </Menu>

                </Drawer>
            </>
        )
    }
}

export default Favorties;