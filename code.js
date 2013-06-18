
	$(function () {
	
		//определяем и высчитываем периоды синусоид
		var T1, T2, T3, T4, T5, day;
		T5 = 84;
		day = (2 * Math.PI) / T5 ;
		T1 = T5 / 23;
		T2 = T5 / 28;
		T3 = T5 / 33;
		T4 = T5 / 54;
		T5 = T5 / T5;
		
		// создаем данные для разных синусоид
		var d1 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.10) {
			d1.push([i, Math.sin(i * T1)]);
		}
		
		var d2 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.10) {
			d2.push([i, Math.sin(i * T2)]);
		}
		
		var d3 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.10) {
			d3.push([ i, Math.sin(i * T3)]);
		}
		
		var d4 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.10) {
			d4.push([i, Math.sin(i * T4)]);
		}
		
		var d5 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.10) {
			d5.push([i, Math.sin(i * T5)]);
		}
		
		// определяем разметку нижней шкалы в днях максимального периода
		var days = [];
		var countDay = 0;
		for (var i = 0; i < Math.PI * 2; i += day) {
			countDay++;
			days.push([i, countDay + " "]);
		}
		
		var timeFormat = "%d.%m.%y";
		
		// свойства графика
		var plot_conf = { 
			series: {
				lines: { show: true },
				points: { show: true }
			},
			xaxis: {

				ticks: days,
				/*[
					0, [ Math.PI/2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
					[ Math.PI * 3/2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
				],*/
				zoomRange: [Math.PI/4, null],
				panRange: [0, Math.PI * 2]
			},
			yaxis: {
				ticks: 10,
				min: -1.5,
				max: 1.5,
				tickDecimals: 1,
				panRange: [-1.5, 1.5],
				zoomRange: [2.1, null]
			},
			grid: {
				backgroundColor: { colors: [ "#fff", "#eee" ] },
				borderWidth: {
					top: 1,
					right: 1,
					bottom: 2,
					left: 2
				}
			},
			zoom: {
				interactive: true
			},
			pan: {
				interactive: true

			}
		
		};
		// выводим наш график синусоид
		var datasets = {
			"sin1(x)": {
				label: "sin1(x)",
				data: d1
			},        
			"sin2(x)": {
				label: "sin2(x)",
				data: d2
			},
			"sin3(x)": {
				label: "sin3(x)",
				data: d3
			},
			"sin4(x)": {
				label: "sin4(x)",
				data: d4
			},
			"sin5(x)": {
				label: "sin5(x)",
				data: d5
			}
		};

		// hard-code color indices to prevent them from shifting as
		// countries are turned on/off

		var i = 0;
		$.each(datasets, function(key, val) {
			val.color = i;
			++i;
		});

		// insert checkboxes 
		var choiceContainer = $("#choices");
		$.each(datasets, function(key, val) {
			choiceContainer.append("<br/><input type='checkbox' name='" + key +
				"' checked='checked' id='id" + key + "'></input>" +
				"<label for='id" + key + "'>"
				+ val.label + "</label>");
		});

		choiceContainer.find("input").click(plotAccordingToChoices);

		function plotAccordingToChoices() {

			var data = [];

			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && datasets[key]) {
					data.push(datasets[key]);
				}
			});

			if (data.length > 0) {
				$.plot("#graph", data, plot_conf);
			}
		}

		plotAccordingToChoices();
		
		var data_array = [];
		$("#foo").submit(data_array = collect_Data);// создаем событие отправки формы при заполнении и проверяем на корректность данных
		
		//функция определения високосного года
		function check_leap_year(year)
		{
			if (((year%4 == 0) && (year%100 != 0)) ||(year%400 == 0))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		//
		
		
		//функция проверки правильности введенных данных
		function сorrect_Data( day, month, year, month_build, year_build)
		{
		var array_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Число дней в каждом месяце невисокосного года
		var min_year = 1900; // Минимальный год
		var max_year = 2100; // Максимальный год
		var bool = false; // булевые переменные, отвечающие за правильность данных
			bool_birth = false;
			bool_build = false;
			
		// Проверка на корректность даты рождения
		if (( year >= min_year ) && ( year <= max_year )) 
		{
			if (( month >= 1 ) && ( month <= 12 )) 
			{
				if (check_leap_year(year) && (day <= 29) && (month == 2) && (day > 0))
				{
					bool_birth = true;
				}
				if (( day <= array_month[month - 1] ) && (day > 0 )) 
				{
					bool_birth = true;
				}
			}
			else
			{
				bool_birth = false;
			}
		}
		else
		{
			bool_birth = false;
		}
		
		//проверка на корректность даты для постройки графика
		if (bool_birth)
		{
			if((year_build == year) && (year_build <= max_year))
			{
				if ((month_build >= month) && ( month_build <= 12 ))
				{
					bool_build = true;
				}
				else
				{
					bool_build = false;
				}
			}
			if ((year_build > year) && (year_build <= max_year))
			{
				if ((month_build >= 1) && ( month_build <= 12 ))
				{
					bool_build = true;
				}
				else
				{
					bool_build = false;
				}
			}
		}
	// анализируем полученные результаты
		if (bool_birth && bool_build)
		{
			bool = true;
		}
		else if ((bool_build == false) && (bool_birth))
		{
			bool = false;
			alert("Некорректная дата постройки. Введите еще раз ");
		}
		else if (bool_birth == false)
		{
			bool = false;
			alert("Некорректная дата рождения. Введите еще раз");
		}
		
	return bool;
	}
	
	//функция собирающие данные в массив
	function collect_Data()
	{
		var day = $("#day"); // день рождения
		var month = $("#month");
		var year = $("#year");
		var month_build = $("#month1");
		var year_build = $("#year1");
		var data_array = [];
		
		if ( сorrect_Data( day.val()-0, month.val()-0, year.val()-0, month_build.val()-0, year_build.val()-0))
		{
			var data_array = [ day.val()-0, month.val()-0, year.val()-0, month_build.val()-0, year_build.val()-0];
			alert(data_array);
			return data_array;
		}
		else
		{
			return false;
		}
	}
	//функция расчитывающая дни месяца
	
	//функция расчитывающая точки для графиков
	});
