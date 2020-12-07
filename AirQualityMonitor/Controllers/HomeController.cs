using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using AirQualityMonitor.Services;
using Amazon.DynamoDBv2;
using System;
using System.Collections.Generic;
using AirQualityMonitor.Models;

namespace AirQualityMonitor.Controllers
{
    public class HomeController : Controller
    {
        private readonly IAmazonDynamoDB _dynamoClient;
        private readonly DynamoService dbService;

        public HomeController(IAmazonDynamoDB dbClient)
        {
            _dynamoClient = dbClient;
            dbService = new DynamoService(_dynamoClient, "AirQualityData_grp1");
        }

        public async Task<IActionResult> Index()
        {
            // Get data for 7 days prior
            var recentReadings = await dbService.GetLatestReadings();

            var locationChartList = new List<LocationChartData>();
            var locationGroups = recentReadings.GroupBy(i => i.Location).ToList();

            locationGroups.ForEach(group =>
            {
                var location = group.Select(i => i).FirstOrDefault()?.Location;

                var chartList = new List<ChartData>
                {
                    GetChartData(group.ToList(), ReadingType.NO2, location),
                    GetChartData(group.ToList(), ReadingType.Fine, location),
                    GetChartData(group.ToList(), ReadingType.Coarse, location)
                };

                locationChartList.Add(new LocationChartData() { Location = location, Charts = chartList });
            });

            return View(locationChartList);
        }




        private ChartData GetChartData(List<Reading> locationReadings, ReadingType readingType, string location)
        {
            // Build chart data object
            var chartData = new ChartData
            {
                Title = $"{location}: {readingType}",
                Labels = GetChartLabels(DateTime.Today - TimeSpan.FromDays(7)),
                YAxis = new Axis($"{readingType} per microgram"),
                XAxis = new Axis("Day of the week")
            };

            var statReadingsSet = GetStatisticReadingList(locationReadings, readingType);

            var minSet = new DataSet
            {
                Label = $"{readingType}: Minimum"
            };

            var maxSet = new DataSet
            {
                Label = $"{readingType}: Maximum"
            };

            var avgSet = new DataSet
            {
                Label = $"{readingType}: Average"
            };

/*
            var timestampGroups = statReadingsSet
                .GroupBy(i => i.timestamp)
                .ToList();

            foreach (var item in timestampGroups)
            {
                var valuesList = item.Select(groupValues => groupValues.value).DefaultIfEmpty();

                var minValue = valuesList.Min();
                minSet.Values.Add(minValue);

                var maxValue = valuesList.Max();
                maxSet.Values.Add(maxValue);

                var avgValue = valuesList.Average();
                avgSet.Values.Add(avgValue);
            }*/

            var currDate = DateTime.Today - TimeSpan.FromDays(6);

            while (currDate <= DateTime.Today)
            {
                var currDateTimestamp = GetTimestampFromDateTime(currDate);
                var dayData = statReadingsSet.Where(i => i.timestamp == currDateTimestamp);

                var valuesList = dayData.Select(groupValues => groupValues.value).DefaultIfEmpty();

                var minValue = valuesList.Min();
                minSet.Values.Add(minValue);

                var maxValue = valuesList.Max();
                maxSet.Values.Add(maxValue);

                var avgValue = valuesList.Average();
                avgSet.Values.Add(avgValue);

                currDate += TimeSpan.FromDays(1);
            }


            chartData.DataSets.Add(minSet);
            chartData.DataSets.Add(maxSet);
            chartData.DataSets.Add(avgSet);

            return chartData;
        }

        private List<StatisticReading> GetStatisticReadingList(List<Reading> locationReadings, ReadingType readingType)
        {
            return locationReadings
                .Select(i =>
                {
                    // get date timestamp
                    var dateTime = GetDateTimeFromTimestamp(i.Timestamp);
                    long dateTimestamp = GetTimestampFromDateTime(dateTime);

                    return new StatisticReading
                    {
                        timestamp = dateTimestamp,
                        value = GetStatisticReading(i, readingType)
                    };
                })
                .ToList();
        }

        

        public float GetStatisticReading(Reading reading, ReadingType type)
        {
            string value = type switch
            {
                ReadingType.NO2 => reading.NO2_Concentration,
                ReadingType.Fine => reading.Fine_PM_Concentration,
                ReadingType.Coarse => reading.Coarse_PM_Concentration,
                _ => "",
            };
            return float.Parse(value);
        }
        private List<string> GetChartLabels(DateTime startDate)
        {
            var dateList = new List<string>();

            while (startDate != DateTime.Today)
            {
                var dateString = startDate.DayOfWeek.ToString();
                dateList.Add(dateString);

                startDate += TimeSpan.FromDays(1);
            }

            return dateList;
        }

        private long GetTimestampFromDateTime(DateTime dateTime)
        {
            return ((DateTimeOffset)dateTime.Date).ToUnixTimeSeconds();
        }

        public DateTime GetDateTimeFromTimestamp(long seconds)
        {
            return new DateTime(1970, 1, 1, 0, 0, 0, 0)
                .AddSeconds(seconds);
        }

        public enum ReadingType
        {
            NO2 = 1,
            Fine = 2,
            Coarse = 3
        }

    }
}
