import React, { useState } from 'react';
import { AutoComplete, Form, Button, Row, Col } from 'antd';
import { getAutoCompleteOptions } from '../api';

const SearchForm = ({ onSearch }) => {
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAutoComplete = async (field, searchText) => {
        if (!searchText) {
            setOptions([]);
            return;
        }

        try {
            setLoading(true);
            const data = await getAutoCompleteOptions(field, searchText);
            setOptions(data);
        } catch (error) {
            console.error('自动完成请求失败:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form form={form} onFinish={onSearch}>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item name="playerID" label="playerID">
                        <AutoComplete
                            placeholder="输入球员ID"
                            onSearch={(text) => handleAutoComplete('players', text)}
                            options={options}
                            loading={loading}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="yearID" label="yearID">
                        <AutoComplete
                            placeholder="输入年份"
                            onSearch={(text) => handleAutoComplete('years', text)}
                            options={options}
                            loading={loading}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="teamID" label="teamID">
                        <AutoComplete
                            placeholder="输入球队ID"
                            onSearch={(text) => handleAutoComplete('teams', text)}
                            options={options}
                            loading={loading}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="lgID" label="lgID">
                        <AutoComplete
                            placeholder="输入联盟ID"
                            onSearch={(text) => handleAutoComplete('leagues', text)}
                            options={options}
                            loading={loading}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>重置</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchForm;