import React from 'react';
import { Table, Select, InputNumber, Space,Button,Popover } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import StadiumMap from './StadiumMap';
import { teamStadiums } from './teamStadiums';
const { Option } = Select;

const ResultTable = ({ data, loading }) => {
    const getFilterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                    defaultValue="gte"
                    style={{ width: '100%' }}
                    onChange={val => setSelectedKeys([val, selectedKeys[1]])}
                >
                    <Option value="gte">greater than</Option>
                    <Option value="lte">less than</Option>
                    <Option value="eq">equal to</Option>
                    <Option value="between">between</Option>
                </Select>
                <InputNumber
                    placeholder="最小值"
                    value={selectedKeys[1]}
                    onChange={val => setSelectedKeys([selectedKeys[0], val])}
                    style={{ width: '100%' }}
                />
                {selectedKeys[0] === 'between' && (
                    <InputNumber
                        placeholder="最大值"
                        value={selectedKeys[2]}
                        onChange={val => setSelectedKeys([selectedKeys[0], selectedKeys[1], val])}
                        style={{ width: '100%' }}
                    />
                )}
                <Space>
                    <Button type="primary" onClick={() => confirm()}>确定</Button>
                    <Button onClick={() => clearFilters()}>重置</Button>
                </Space>
            </Space>
        </div>
    );


    const columns = [
        {
            title: 'playerID',
            dataIndex: 'playerID',
            key: 'playerID',
            sorter: (a, b) => a.playerID.localeCompare(b.playerID),
            filterSearch: true,
            filters: [],
        },
        {
            title: 'year',
            dataIndex: 'yearID',
            key: 'yearID',
            sorter: (a, b) => a.yearID - b.yearID,
            filterDropdown: (props) => getFilterDropdown(props),
            onFilter: (value, record, filterKeys) => {
                const [type, min, max] = filterKeys;
                switch(type) {
                    case 'gte': return record.yearID >= min;
                    case 'lte': return record.yearID <= min;
                    case 'eq': return record.yearID === min;
                    case 'between': return record.yearID >= min && record.yearID <= max;
                    default: return true;
                }
            },
        },
        // 其他数值列使用相同的筛选逻辑
        {
            title: 'G',
            dataIndex: 'G',
            key: 'G',
            sorter: (a, b) => a.G - b.G,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'team',
            dataIndex: 'teamID',
            key: 'teamID',
            sorter: (a, b) => a.teamID.localeCompare(b.teamID),
            render: (teamID) => (
                <Popover
                    content={<StadiumMap stadium={teamStadiums[teamID]} />}
                    title={`${teamID} 主场`}
                    trigger="hover"
                    mouseEnterDelay={0.5}
                >
                    <span>{teamID}</span>
                </Popover>
            )
        },
        {
            title: 'lg',
            dataIndex: 'lgID',
            key: 'lgID',
            sorter: (a, b) => a.lgID.localeCompare(b.lgID),
        },
        {
            title: 'AB',
            dataIndex: 'AB',
            key: 'AB',
            sorter: (a, b) => a.AB - b.AB,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'R',
            dataIndex: 'R',
            key: 'R',
            sorter: (a, b) => a.R - b.R,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'H',
            dataIndex: 'H',
            key: 'H',
            sorter: (a, b) => a.H - b.H,
            filterDropdown: getFilterDropdown,
        },
        {
            title: '2B',
            dataIndex: '2B',
            key: '2B',
            sorter: (a, b) => a['2B'] - b['2B'],
            filterDropdown: getFilterDropdown,
        },
        {
            title: '3B',
            dataIndex: '3B',
            key: '3B',
            sorter: (a, b) => a['3B'] - b['3B'],
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'HR',
            dataIndex: 'HR',
            key: 'HR',
            sorter: (a, b) => a.HR - b.HR,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'RBI',
            dataIndex: 'RBI',
            key: 'RBI',
            sorter: (a, b) => a.RBI - b.RBI,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'SB',
            dataIndex: 'SB',
            key: 'SB',
            sorter: (a, b) => a.SB - b.SB,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'CS',
            dataIndex: 'CS',
            key: 'CS',
            sorter: (a, b) => a.CS - b.CS,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'BB',
            dataIndex: 'BB',
            key: 'BB',
            sorter: (a, b) => a.BB - b.BB,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'SO',
            dataIndex: 'SO',
            key: 'SO',
            sorter: (a, b) => a.SO - b.SO,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'IBB',
            dataIndex: 'IBB',
            key: 'IBB',
            sorter: (a, b) => a.IBB - b.IBB,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'HBP',
            dataIndex: 'HBP',
            key: 'HBP',
            sorter: (a, b) => a.HBP - b.HBP,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'SH',
            dataIndex: 'SH',
            key: 'SH',
            sorter: (a, b) => a.SH - b.SH,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'SF',
            dataIndex: 'SF',
            key: 'SF',
            sorter: (a, b) => a.SF - b.SF,
            filterDropdown: getFilterDropdown,
        },
        {
            title: 'GIDP',
            dataIndex: 'GIDP',
            key: 'GIDP',
            sorter: (a, b) => a.GIDP - b.GIDP,
            filterDropdown: getFilterDropdown,
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="playerID"
            croll={{ x: 3000 }}
            pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                defaultPageSize: 10,
                pageSizeOptions: ['10', '20', '50', '100']
            }}
        />
    );
};

export default ResultTable;