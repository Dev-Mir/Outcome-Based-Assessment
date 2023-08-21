import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { generateReport } from "../../services/reportServices";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getCourseById,

} from "../../services/courseSevices";
import Marks from "../Student/Marks";



function Report() {


	// --------------------------------

	const options = {
		chart: {
		  id: "basic-bar"
		},
		xaxis: {
		  categories: ["CLO 1", "CLO 1", "CLO 2", "CLO 2"],
		  title: {
			text: "CLOs"
		  }
		},
		yaxis: {
		  title: {
			text: "Performance"
		  },
		  max: 100 // Set the maximum value of y-axis to 100
		},
		dataLabels: {
		  enabled: true,
		  offsetY: -20,
		  style: {
			fontSize: "12px",
			colors: ["#304758"]
		  }
		},
		plotOptions: {
		  bar: {
			dataLabels: {
			  position: "top"
			}
		  }
		}
	  };
	
	  const originalData = [30, 40, 45, 50];
	  const maxDataValue = 100;
	  const scaleFactor = maxDataValue / Math.max(...originalData);
	
	  const scaledData = originalData.map(value => value + scaleFactor);
	
	  const series = [
		{
		  name: "series-1",
		  data: scaledData
		}
	  ];
	  
	// ---------------------------------

  
  


  const [report, setReport] = useState({});
  const {id} = useParams()
  const [courses, setCourses] = useState([]);
  

  const fetchData = async () => {
    const { data, status } = await getCourseById(id);
    if (status === 200) {
      setCourses([data]);
    }
  };

  const fetchReportData = async () => {

    const { data, status } = await generateReport(id);
    
    if (status === 200) {
      setReport(data);
    }
  };

  useEffect(() => {
    fetchReportData();
    fetchData();
  
  }, []);

  console.log(report);

  return (
    <div><br/>
{/* ------------------------------------------------------------- */}

<TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
        <Table sx={{ minWidth: 650 }}  aria-label="simple table" >
          <TableHead>
            <TableRow  sx={{
    // padding: "0px 0px",
    borderBottom: "2px solid black",
    // borderLeft: "2px solid black",
    
    backgroundColor: "lightblue",
    fontSize: "2.1rem"
  }} >
              <TableCell align="center"> Course id </TableCell>
              <TableCell align="center">Course name</TableCell>
              <TableCell align="center">Program</TableCell>
              <TableCell align="center">Semester</TableCell>
              <TableCell align="center">No of students</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, i) => (
              <TableRow key={i}>
                <TableCell align="center">{course.courseId}</TableCell>
                <TableCell align="center">{course.courseName}</TableCell>
                <TableCell align="center">{course.program}</TableCell>
                <TableCell align="center">{course.semester}</TableCell>
                <TableCell align="center">{course.semester}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <br/>


{/* ----------------------------------------------------------- */}


        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">CLOs</TableCell>
                  <TableCell align="center">Poor({"<60%"})</TableCell>
                  <TableCell align="center">Average({"<61% - 70%"})</TableCell>
                  <TableCell align="center">Good({"<71% - 84%"})</TableCell>
                  <TableCell align="center">Excelent({">=85%"})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">CLO 1: Classes</TableCell>
                  <TableCell align="center">2</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">CLO 2: Methods</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      {/* </Grid> */}
    {/* </div> */}


{/* // -------------------- */}


<div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>



</div>	

// --------------------


  );
};

export default Report;
