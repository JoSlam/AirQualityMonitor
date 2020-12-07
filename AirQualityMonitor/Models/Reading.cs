namespace AirQualityMonitor.Models
{
    public class Reading
    {
        public string Device_ID { get; set; }
        public long Timestamp { get; set; }
        public string Location { get; set; }
        public string NO2_Concentration { get; set; }
        public string Fine_PM_Concentration { get; set; }
        public string Coarse_PM_Concentration { get; set; }
    }
}
