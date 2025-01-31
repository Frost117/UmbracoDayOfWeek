using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;

namespace UmbracoDayOfWeek
{
    [VersionedApiBackOfficeRoute("")]
    [ApiExplorerSettings(GroupName = "DayOfTheWeekPicker")]
    public sealed class DayOfTheWeekController : ManagementApiControllerBase
    {
        [HttpGet("get-dropdown-value-list")]
        public IActionResult GetDropdownValueList(DayOfWeek startDayOfTheWeek)
        {
            var days = Enum.GetValues<DayOfWeek>().Cast<DayOfWeek>();
            var reorderedDays = days.Skip((int)startDayOfTheWeek).Concat(days.Take((int)startDayOfTheWeek));

            return Ok(reorderedDays.Select(day => new DropdownItem()
            {
                Id = (int)day,
                DefaultName = day.ToString()
            }));
        }
    }
}