using AirQualityMonitor.Services;
using Amazon.DynamoDBv2;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
            var response = await dbService.GetLatestReadings();

            // Get most recent record
            // Get data for 7 days prior

            // Build list of chart data
            // Return list of chart data
            return View(response);
        }
    }
}
