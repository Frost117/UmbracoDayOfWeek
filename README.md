# Umbraco DayOfWeek custom property editor.

A simple dropdown property editor for content editors to select a day of the week, with configurable start day options.

It is based on .net's [DayOfWeek Enum](https://learn.microsoft.com/en-us/dotnet/api/system.dayofweek?view=net-9.0).

## Features

- **Dropdown UI** for selecting a day of the week.
- **Configurable start day** (e.g., Monday as the first day instead of Sunday).
- **Easy integration** into your .NET application.

### Usage
By default the dropdown's first day will be Monday.

![Default start day](https://raw.githubusercontent.com/Frost117/UmbracoDayOfWeek/refs/heads/v15/UmbracoDayOfWeek/images/backoffice-content-editing-v15.png)

When saving the day a value converter will take care of the database entry, as it is stored as a numeric value.

![Model.value for the week days exempel](/https://raw.githubusercontent.com/Frost117/UmbracoDayOfWeek/refs/heads/v15/UmbracoDayOfWeek/images/backoffice-content-editing-model-v15.png)

### Configuration
You can change the start day in the dropdown via the settings in the datatype:
![Configuration to change start day of the week](/https://raw.githubusercontent.com/Frost117/UmbracoDayOfWeek/refs/heads/v15/UmbracoDayOfWeek/images/backoffice-settings-v15.png)

![Changing which day the week starts of with to Friday](https://raw.githubusercontent.com/Frost117/UmbracoDayOfWeek/refs/heads/v15/UmbracoDayOfWeek/images/friday-start.png)

The result of changing the start of week to Friday:

![Result of changing the start day of the week to Friday](https://raw.githubusercontent.com/Frost117/UmbracoDayOfWeek/refs/heads/v15/UmbracoDayOfWeek/images/start-week-friday.png)