using AirQualityMonitor.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AirQualityMonitor.Services
{
    public class DynamoService
    {
        private readonly IAmazonDynamoDB _dynamoClient;
        private string TableName { get; set; }

        public DynamoService(IAmazonDynamoDB dbClient, string tableName)
        {
            _dynamoClient = dbClient;
            TableName = tableName;
        }


        public async Task<List<Reading>> GetAllReadingsAsync()
        {
            var table = Table.LoadTable(_dynamoClient, TableName);
            ScanFilter filter = new ScanFilter();

            var search = table.Scan(filter);
            var documentList = await search.GetRemainingAsync();

            var readingsList = JsonConvert.DeserializeObject<List<Reading>>(documentList.ToJson());
            return readingsList;
        }

    }
}
