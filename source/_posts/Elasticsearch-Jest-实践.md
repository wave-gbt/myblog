---
title: Elasticsearch Jest 实践
date: 2018-12-24 20:30:11
tags: ES
permalink: es-jest-practice
copyright: true
password:
top:
---

## Jest
[GitHub](https://github.com/searchbox-io/Jest/tree/master/jest)
Jest是 `Elasticsearch` 的 Java Http Rest 客户端。ElasticSearch 已经具备应用于 Elasticsearch 内部的 Java API，但是 Jest 弥补了ES自有API缺少Elasticsearch Http Rest接口客户端的不足。
<!-- more -->

## springBoot 集成 Jest 依赖
```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
        </dependency>
        
        <dependency>
            <groupId>io.searchbox</groupId>
            <artifactId>jest</artifactId>
            <version>6.3.0</version>
        </dependency>
```

## 使用介绍
![jest 使用](/img/20170813164101013.png)

## 实践
```java
    /**
     * 创建查询表达式
     * @param criterias
     * @param page
     * @return
     */
    private SearchSourceBuilder buildSearch(List<Criteria> criterias, EqlPage page) {
        //指定查询的库表
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        // 分页
        if (Objects.nonNull(page)) {
            searchSourceBuilder.from((page.getCurrentPage() - 1) * page.getPageRows()).size(page.getPageRows());
        }

        if (CollectionUtils.isNotEmpty(criterias)) {
            BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
            criterias.stream().forEach(t -> {
                if (SHOULD.equals(t.getFieldType())) {
                    // 设置 should 匹配条件
                    boolQueryBuilder.should(QueryBuilders.termQuery(t.getFieldName(), t.getFieldValue()));
                }
                if (MUST.equals(t.getFieldType())) {
                    // 设置 must 匹配条件
                    boolQueryBuilder.must(QueryBuilders.termQuery(t.getFieldName(), t.getFieldValue()));
                }
                if (RANGE.equals(t.getFieldType())) {
                    // 设置 range 区间匹配条件
                    boolQueryBuilder.must(
                            QueryBuilders.rangeQuery(t.getFieldName()).format(DATE_FORMAT).from(t.getFieldValue()).to(t.getFieldValue2()));
                }
            });
            searchSourceBuilder.query(boolQueryBuilder);
        }
        return searchSourceBuilder;
    }
    
    /**
     * es 执行查询
     * @param searchSourceBuilder
     * @return
     */
    public List<OrderBean> search(SearchSourceBuilder searchSourceBuilder,EqlPage page) {
       
        List<OrderBean> list = Lists.newArrayList();
        try {
            SearchResult result = client.execute(new Search.Builder(searchSourceBuilder.toString())
                    // multiple index or types can be added.
                    .addIndex(baseConfig.getEsIndex())
                    .addType(baseConfig.getEsType())
                    // 设置排序字段与排序方式
                    .addSort(new Sort(StringUtils.isBlank(page.getSortField()) ? "create_time" : page.getSortField(),
                            StringUtils.isEmpty(page.getSort())
                                    ? Sort.Sorting.DESC : Sort.Sorting.ASC))
                    .build());

            result.getSourceAsObjectList(OrderBean.class, false);
            List<SearchResult.Hit<Object, Void>> hits = result.getHits(Object.class);
            if (CollectionUtils.isEmpty(hits)) {
                return list;
            }
            log.info("es - list size :{}", hits.size());
            // 将查询结果映射到java实体里
            hits.stream().forEach(t -> {
                String news = JSON.toJSONString(t.source);
                OrderBean order = JSON.parseObject(news, OrderBean.class);
                list.add(order);
            });
            // 获取查询总记录数
            page.setTotalRows(result.getTotal().intValue());
            // 设置总页数
            page.setPageNum((page.getTotalRows() - 1) / page.getPageRows() + 1);
        } catch (Exception e) {
            log.info("es - 查询失败：{}",JSON.toJSONString(e.getMessage()));
            throw new BusinessException("9999","es 查询失败：{}",e.getMessage());
        }
        return list;
    }
```


