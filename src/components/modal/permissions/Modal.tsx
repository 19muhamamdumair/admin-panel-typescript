import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
// import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';




// import Button from 'muicss/lib/react/button';




const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const menu = (
        <Menu
            items={[
                {
                    label: <a href="https://www.antgroup.com">1st menu item</a>,
                    key: '0',
                },
                {
                    label: <a href="https://www.aliyun.com">2nd menu item</a>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: '3rd menu item',
                    key: '3',
                },
            ]}
        />
    );

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Permission Group Name" footer={false} className="w-modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="form-group">
                    <small>Permission Group Name</small>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Permission Group Name" />
                </div>

                <div className="form-group mt-3">
                    <small>FILTER PERMISSIONS</small>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="FILTER BY PERMISSION NAME" />
                </div>
                <div className="d-flex mt-3">
                    
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                            <button type="button" className="btn dropdown-toggle drop-set dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <small className="fs-8 my-auto py-auto sr-only px-1">Permission Type</small>
                        </button>
                                {/* <DownOutlined /> */}
                            </Space>
                        </a>
                    </Dropdown>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                            <button type="button" className="btn dropdown-toggle drop-set dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <small className="fs-8 my-auto py-auto sr-only px-1">Existing Groups</small>
                        </button>
                                {/* <DownOutlined /> */}
                            </Space>
                        </a>
                    </Dropdown>
                    <button type="button" className="btn drop-set btn-outline-primary">More Filters</button>


                </div>
                <div className="d-flex mt-3">
                    <p className='fs-13 my-auto'>PERMISSION TYPE ROLE AND POSSITION NAME</p>
                    <button type="button" className="btn px-2 m-0 ms-auto drop-set  "> <Checkbox /> Select all</button>


                </div>

                <div className="d-flex mt-3">
                    <Checkbox  inputProps={{
    'aria-label': 'Checkbox A',
    title : 'asdasd'
  }} />
                    <p className='my-auto'>Permission 1</p>

                </div>
                <div className="d-flex">
                    <Checkbox />
                    <p className='my-auto'>Permission 2</p>

                </div>
                <div className="d-flex">
                    <Checkbox />
                    <p className='my-auto'>Permission 3</p>

                </div>
                <div className="d-flex">
                        <Checkbox />
                    <p className='my-auto'>Permission 4</p>

                </div>
                <div className="d-flex">
                    <Checkbox />
                    <p className='my-auto'>Permission 5</p>

                </div>
                <div className="d-flex">
                    <Checkbox />
                    <p className='my-auto'>Permission 6</p>

                </div>
                <div className="d-flex">
                    <Checkbox />
                    <p className='my-auto'>Permission 7</p>

                </div>
                <div className="d-flex marg-set">
                    <Checkbox />
                    <p className='my-auto'>Permission 8</p>

                </div>

                <hr />
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                    <button type="button" className="btn btn-primary ms-3">Save</button>
                </div>
            </Modal>
        </>
    );
};

export default App;