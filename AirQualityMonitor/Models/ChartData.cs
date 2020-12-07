using System.Collections.Generic;
using System.Threading;

namespace AirQualityMonitor.Models
{
    public class ChartData
    {
        public static int _globalChartID;

        public int ID { get; private set; }
        public Axis YAxis { get; set; }
        public Axis XAxis { get; set; }
        public string Title { get; set; }
        public List<DataSet> DataSets { get; set; } = new List<DataSet>();
        public List<string> Labels { get; set; } = new List<string>();

        public ChartData() { }

        public ChartData(string title, List<DataSet> dataSets, List<string> labels)
        {
            ID = Interlocked.Increment(ref _globalChartID);

            Title = title;
            DataSets = dataSets;
            Labels = labels;
        }
    }
}
