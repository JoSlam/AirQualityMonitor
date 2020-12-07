using System.Collections.Generic;

namespace AirQualityMonitor.Models
{
    public class LocationChartData
    {
        public string Location { get; set; }
        public List<ChartData> Charts { get; set; }
    }
}
