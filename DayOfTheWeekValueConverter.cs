using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

namespace UmbracoDayOfWeek;

public class UmbracoDayOfWeekConverter : IPropertyValueConverter
{
    public bool IsConverter(IPublishedPropertyType propertyType) => propertyType.EditorUiAlias == "UmbracoDayOfWeek";
    public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) => Enum.TryParse<DayOfWeek>(inter?.ToString(), out DayOfWeek d) ? d : null;

    public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
    {
        throw new NotImplementedException();
    }

    public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) => Enum.TryParse<DayOfWeek>(source?.ToString(), out DayOfWeek d) ? d : null;

    public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) => PropertyCacheLevel.Element;
    public bool? IsValue(object value, PropertyValueLevel level) => Enum.TryParse<DayOfWeek>(value?.ToString(), out _);

    Type IPropertyValueConverter.GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(DayOfWeek);
}
