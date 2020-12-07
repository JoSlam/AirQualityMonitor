using System.Collections.Generic;

namespace AirQualityMonitor.Models
{
    public class DataSet
    {
        public string Label { get; set; }
        public List<float> Values { get; set; } = new List<float>();

        public DataSet() { }

        public DataSet(string label, List<float> values)
        {
            Label = label;
            Values = values;
        }
    }
}
