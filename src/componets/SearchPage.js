import React, { useState, useEffect } from 'react';
import { Layout, Card, message } from 'antd';
import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import { searchBatting, getAllBatting } from '../api';

const { Content } = Layout;

const SearchPage = ({ initialData }) => {
    const [data, setData] = useState(initialData || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!initialData) {
            fetchInitialData();
        }
    }, [initialData]);

    const fetchInitialData = async () => {
        try {
            const result = await getAllBatting();
            setData(result);
        } catch (error) {
            message.error('加载数据失败');
            console.error('加载失败:', error);
        }
    };

    const handleSearch = async (values) => {
        setLoading(true);
        try {
            const result = await searchBatting(values);
            setData(result);
        } catch (error) {
            message.error('搜索失败，请重试');
            console.error('搜索出错:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Card title="棒球数据高级搜索" style={{ marginBottom: '24px' }}>
                    <SearchForm onSearch={handleSearch} />
                </Card>
                <Card>
                    <ResultTable data={data} loading={loading} />
                </Card>
            </Content>
        </Layout>
    );
};

export default SearchPage;