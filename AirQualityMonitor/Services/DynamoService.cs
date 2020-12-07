using AirQualityMonitor.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirQualityMonitor.Services
{
    public class DynamoService
    {
        private readonly IAmazonDynamoDB _dynamoClient;
        private string TableName { get; set; }
        private readonly Table _table;

        public DynamoService(IAmazonDynamoDB dbClient, string tableName)
        {
            _dynamoClient = dbClient;
            TableName = tableName;
            _table = Table.LoadTable(_dynamoClient, TableName);
        }


        public async Task<List<Reading>> GetAllReadingsAsync()
        {
            ScanFilter filter = new ScanFilter();

            var search = _table.Scan(filter);
            var documentList = await search.GetRemainingAsync();

            var readingsList = JsonConvert.DeserializeObject<List<Reading>>(documentList.ToJson());
            return readingsList;
        }

        public async Task<List<Reading>> GetLatestReadings(string deviceID = "")
        {
            // Generate a timestamp
            var sevenDaysAgo = (DateTimeOffset)DateTime.Today - TimeSpan.FromDays(6);
            var timeStamp = sevenDaysAgo.ToUnixTimeSeconds();

            // Create a query for last 7 days of data
            Search search;
            if (!string.IsNullOrEmpty(deviceID))
            {
                var queryFilter = new QueryFilter();
                queryFilter.AddCondition("device_id", QueryOperator.Equal, deviceID);
                queryFilter.AddCondition("timestamp", QueryOperator.GreaterThanOrEqual, timeStamp);
                
                search = _table.Query(queryFilter);
            }
            else
            {
                var scanFilter = new ScanFilter();
                scanFilter.AddCondition("timestamp", ScanOperator.GreaterThanOrEqual, timeStamp);

                search = _table.Scan(scanFilter);
            }

            var documentList = await search.GetRemainingAsync();
            var readingsList = JsonConvert.DeserializeObject<List<Reading>>(documentList.ToJson());

            // Parse and return readings
            return readingsList;
        }

    }
}
