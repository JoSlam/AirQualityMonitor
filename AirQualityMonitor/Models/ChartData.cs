using System.Collections.Generic;
using System.Threading;

namespace AirQualityMonitor.Models
{
    public class ChartData
    {
        public int ID { get; private set; }
        public Axis YAxis { get; set; }
        public Axis XAxis { get; set; }

        public static int _globalChartID;

        public string Title;
        public List<decimal> DataSets;

        public ChartData(string title, List<decimal> dataSets)
        {
            ID = Interlocked.Increment(ref _globalChartID);

            Title = title;
            DataSets = dataSets;
        }
    }
}
