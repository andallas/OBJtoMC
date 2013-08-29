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
		var uvs = [];
		for(var i = 0; i < match.length; i++)
		{
			var uv = match[i].match(regex);
			if(uv !== null)
				uvs.push(uv);
		}

		regex = /^f\s(.+)\/(.+)\s(.+)\/(.+)\s(.+)\/(.+)\s(.+)\/(.+)$/;
		var faces = [];
		for(var i = 0; i < match.length; i++)
		{
			var face = match[i].match(regex);
			if(face !== null)
				faces.push(face);
		}

		vertices = converter.cleanArray(vertices);
		uvs = converter.cleanArray(uvs);
		faces = converter.cleanArray(faces);

		converter.build(vertices, uvs, faces);

		return false;
	}

	converter.cleanArray = function(array)
	{
		var newArray = [];
		for(var i = 0; i < array.length; i++)
		{
			for(var j = 1; j < array[i].length; j++)
			{
				newArray.push(array[i][j]);
			}
		}
		array = newArray;

		for(var i = 0; i < array.length; i++)
		{
			var element = array[i];
			element = Math.round(element / 0.0625) * 0.0625;
			array[i] = element;
		}
		return array;
	}

	converter.build = function(Vertices, UVs, Faces)
	{
		var vertString = "";
		var uvString = "";
		var faceString = "";

		for(var i = 0; i < Vertices.length; i++)
		{
			switch(i % 3)
			{
				case 0:
					var string = "double x" + (Math.floor(i / 3) + 1) + " = (double)(par2 + " + Vertices[i] + ");\n";
					vertString = vertString + string;
				break;
				case 1:
					var string = "double y" + (Math.floor(i / 3) + 1) + " = (double)(par3 + " + Vertices[i] + ");\n";
					vertString = vertString + string;
				break;
				case 2:
					var string = "double z" + (Math.floor(i / 3) + 1) + " = (double)(par4 + " + Vertices[i] + ");\n";
					vertString = vertString + string;
				break;
				default:
				break;
			}
		}

		for(var i = 0; i < UVs.length; i++)
		{
			switch(i % 2)
			{
				case 0:
					if(UVs[i] == 0)
					{
						var string = "double u" + (Math.floor(i / 2) + 1) + " = (double)icon.getMinU();\n";
					}
					else if(UVs[i] == 1)
					{
						var string = "double u" + (Math.floor(i / 2) + 1) + " = (double)icon.getMaxU();\n";
					}
					else
					{
						var string = "double u" + (Math.floor(i / 2) + 1) + " = (double)icon.getInterpolatedU(" + UVs[i] + "D);\n";
					}
					uvString = uvString + string;
				break;
				case 1:
					if(UVs[i] == 0)
					{
						var string = "double v" + (Math.floor(i / 2) + 1) + " = (double)icon.getMinV();\n";
					}
					else if(UVs[i] == 1)
					{
						var string = "double v" + (Math.floor(i / 2) + 1) + " = (double)icon.getMaxV();\n";
					}
					else
					{
						console.log(UVs[i]);
						var string = "double v" + (Math.floor(i / 2) + 1) + " = (double)icon.getInterpolatedV(" + UVs[i] + "D);\n";
					}
					uvString = uvString + string;
				break;
				default:
				break;
			}
		}

		for(var i = 0; i < Faces.length; i++)
		{
			switch(i % 2)
			{
				case 0:
					var string = "tessellator.addVertexWithUV(x" + Faces[i] + ", y" + Faces[i] + ", z" + Faces[i] + ", ";
					faceString = faceString + string;
				break;
				case 1:
					var string = "u" + Faces[i] + ", v" + Faces[i] + ");\n";
					faceString = faceString + string;
				break;
				default:
				break;
			}
		}

		var parsedCode =  vertString + "\n" + uvString + "\n" + faceString;
		document.getElementById('area_02').value = parsedCode;

		return false;
	}

	return converter;
})
(converter || {});