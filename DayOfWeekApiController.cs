using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.BackOffice.Filters;
using Umbraco.Cms.Web.Common.Attributes;

namespace UmbracoDayOfWeek
{
	[ValidateAngularAntiForgeryToken]
	[PluginController("UmbracoDayOfWeek")]
	public sealed class DayOfWeekApiController: UmbracoAuthorizedJsonController
	{
		public IEnumerable<DropdownItem> GetKeyValueList(DayOfWeek defaultDayOfWeek = DayOfWeek.Monday)
		{
			var days = Enum.GetValues<DayOfWeek>().Cast<DayOfWeek>();
			var reorderedDays = days.Skip((int)defaultDayOfWeek).Concat(days.Take((int)defaultDayOfWeek));

			return reorderedDays.Select(day => new DropdownItem()
			{
				Id = (int)day,
				DefaultName = day.ToString()
			});
		}
	}
}
