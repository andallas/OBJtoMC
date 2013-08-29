var converter = (function(converter)
{
	converter.convert = function()
	{
		var string = document.getElementById('area_01').value;
		var regex = /\n/;
		var match = string.split(regex);

		regex = /^v\s(.+)\s(.+)\s(.+).$/;
		var vertices = [];
		for(var i = 0; i < match.length; i++)
		{
			var vertex = match[i].match(regex);
			if(vertex !== null)
				vertices.push(vertex);
		}

		regex = /^vt\s(.+)\s(.+).$/;
		var UVs = [];
		for(var i = 0; i < match.length; i++)
		{
			var uv = match[i].match(regex);
			if(uv !== null)
				UVs.push(uv);
		}

		regex = /^f\s(.+)\/(.+)\s(.+)\/(.+)\s(.+)\/(.+)\s(.+)\/(.+)$/;
		var faces = [];
		for(var i = 0; i < match.length; i++)
		{
			var face = match[i].match(regex);
			if(face !== null)
				faces.push(face);
		}

		return false;
	}
	return converter;
})
(converter || {});