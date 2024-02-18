        var audio = document.getElementById('myAudio');

        document.body.addEventListener('click', function(event) {
            audio.currentTime = 0;
            audio.play(); 
        });

        function populateSubjectTeacherPairsByDepartment(department) {
            const subjectTeacherPairsDiv = document.getElementById('subjectTeacherPairs');
            subjectTeacherPairsDiv.innerHTML = ''; // Clear previous content
            
            // Define all subject-teacher pairs for each department
            let allPairs = [
                { department: 'CSE(AI&ML)', pairs: [
                    { subject: "Physics", teacher: "Prof. Dibyendu Mal" },
                    { subject: "Chemistry", teacher: "Prof. Priya Sharma" },
                    { subject: "Biology", teacher: "Prof. Rahul Singh" },
                    { subject: "Mathematics", teacher: "Prof. Ananya Das" },
                    { subject: "Computer Science", teacher: "Prof. Arjun Patel" },
                    { subject: "English", teacher: "Prof. Nisha Gupta" },
                    { subject: "History", teacher: "Prof. Amit Kumar" },
                    { subject: "Geography", teacher: "Prof. Sunita Rao" },
                    { subject: "Economics", teacher: "Prof. Rajesh Mehta" },
                    { subject: "Political Science", teacher: "Prof. Deepa Khanna" }
                ]},
                { department: 'IT', pairs: [
                    { subject: "Psychology", teacher: "Prof. Rakesh Verma" },
                    { subject: "Sociology", teacher: "Prof. Anjali Desai" },
                    { subject: "Anthropology", teacher: "Prof. Sunil Trivedi" },
                    { subject: "Philosophy", teacher: "Prof. Maya Shah" },
                    { subject: "Art", teacher: "Prof. Vikram Joshi" },
                    { subject: "Music", teacher: "Prof. Natasha Singh" },
                    { subject: "Dance", teacher: "Prof. Raju Patel" },
                    { subject: "Theater", teacher: "Prof. Neha Jain" },
                    { subject: "Physical Education", teacher: "Prof. Mohan Singh" },
                    { subject: "Engineering", teacher: "Prof. Kirti Sharma" }
                ]},
                { department: 'ME', pairs: [
                    { subject: "Medicine", teacher: "Prof. Ajay Gupta" },
                    { subject: "Law", teacher: "Prof. Pooja Shah" },
                    { subject: "Business", teacher: "Prof. Sameer Verma" },
                    { subject: "Accounting", teacher: "Prof. Aarti Singh" },
                    { subject: "Marketing", teacher: "Prof. Dev Patel" },
                    { subject: "Finance", teacher: "Prof. Jyoti Mehta" },
                    { subject: "Human Resources", teacher: "Prof. Varun Sharma" },
                    { subject: "Management", teacher: "Prof. Karan Gupta" },
                    { subject: "Education", teacher: "Prof. Neha Gupta" },
                    { subject: "Nursing", teacher: "Prof. Amita Singh" }
                ]}
            ];
            
            // Find pairs for the selected department
            const pairs = allPairs.find(item => item.department === department)?.pairs || [];
            
            // Create and populate the table
            const table = document.createElement('table');
            table.className = 'table';
            const thead = document.createElement('thead');
            const trHead = document.createElement('tr');
            const thSubject = document.createElement('th');
            thSubject.textContent = 'Department';
            const thTeacher = document.createElement('th');
            thTeacher.textContent = 'Teacher';
            const thCheckbox = document.createElement('th');
            thCheckbox.textContent = 'Select';
            trHead.appendChild(thSubject);
            trHead.appendChild(thTeacher);
            trHead.appendChild(thCheckbox);
            thead.appendChild(trHead);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            pairs.forEach(data => {
                const tr = document.createElement('tr');
                const tdSubject = document.createElement('td');
                tdSubject.textContent = data.subject;
                const tdTeacher = document.createElement('td');
                tdTeacher.textContent = data.teacher;
                const tdCheckbox = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.className = 'form-check-input';
                checkbox.type = 'checkbox';
                checkbox.name = 'subjectTeacherPair';
                checkbox.value = JSON.stringify(data);
                tdCheckbox.appendChild(checkbox);
                tr.appendChild(tdSubject);
                tr.appendChild(tdTeacher);
                tr.appendChild(tdCheckbox);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            subjectTeacherPairsDiv.appendChild(table);
        }

        populateSubjectTeacherPairsByDepartment('');

        document.getElementById('departmentName').addEventListener('change', function () {
            const selectedDepartment = this.value;
            populateSubjectTeacherPairsByDepartment(selectedDepartment);
        });
        
        //generation of pdf file
        document.getElementById("generatePdfBtn").addEventListener("click", function () {
            const routineOutput = document.getElementById("routineOutput");
            const routineElement = routineOutput.cloneNode(true); // Clone the routine output element

            // Adjust styles and dimensions for PDF generation
            routineElement.style.width = "100%"; // Set the width to 100% for full-width PDF
            routineElement.style.margin = "auto"; // Center the content horizontally
            routineElement.style.maxWidth = "1000px"; // Set a maximum width for better readability

            html2pdf()
                .set({
                    pagebreak: { mode: 'avoid-all' },
                    filename: 'routine.pdf',
                    orientation: 'landscape',
                    margin: [2, 5, 5, 2],
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { dpi: 192, letterRendering: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
                })
                .from(routineElement)
                .save();
        });

    
        document.getElementById("routineForm").addEventListener("submit", function (event) {
            event.preventDefault();

            // Retrieve form values and selected pairs
            const departmentName = document.getElementById("departmentName").value;
            const selectedDaysOpen = Array.from(document.querySelectorAll("input[name=daysOpen]:checked")).map(input => input.value);
            const numberOfPeriods = document.getElementById("numberOfPeriods").value;
            const startTiming = document.getElementById("startTiming").value;
            const endTiming = document.getElementById("endTiming").value;
            const breakStartTiming = document.getElementById("breakStartTiming").value;
            const breakEndTiming = document.getElementById("breakEndTiming").value;
            const selectedPairs = Array.from(document.querySelectorAll("#subjectTeacherPairs input[type=checkbox]:checked")).map(checkbox => JSON.parse(checkbox.value));

            // Ensure that selectedPairs is not empty
            if (selectedPairs.length === 0) {
                alert("Please select at least one subject-teacher pair.");
                return;
            }

            // Log selected pairs to the console for debugging
            console.log("Selected Pairs:", selectedPairs);

            // Calculate time slots, break time slot, and period duration
            const totalPeriods = parseInt(numberOfPeriods);
            const startTime = new Date(`1970-01-01T${startTiming}`);
            const endTime = new Date(`1970-01-01T${endTiming}`);
            const classDuration = (endTime - startTime) / 1000; // in seconds
            const periodDuration = classDuration / totalPeriods; // in seconds
            const timeSlots = [];
            let currentTime = startTime.getTime();
            for (let i = 0; i < totalPeriods; i++) {
                const timeStart = new Date(currentTime);
                currentTime += periodDuration * 1000;
                const timeEnd = new Date(currentTime);
                timeSlots.push({
                    startTime: timeStart,
                    endTime: timeEnd
                });
            }
            const breakStartTime = new Date(`1970-01-01T${breakStartTiming}`);
            const breakEndTime = new Date(`1970-01-01T${breakEndTiming}`);

            // Generate routine output
            let routineOutput = `<div style="text-align: center;"><h4>Generated Routine for ${departmentName}</h4></div>`;
            routineOutput += `<table class="table"><thead><tr><th>Day</th>`;
            for (let i = 1; i <= totalPeriods; i++) {
                if (timeSlots[i - 1].startTime.getTime() === breakStartTime.getTime() && timeSlots[i - 1].endTime.getTime() === breakEndTime.getTime()) {
                    // Display the break time slot in 24-hour format
                    const breakStartFormatted = breakStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    const breakEndFormatted = breakEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    routineOutput += `<th>${breakStartFormatted} - ${breakEndFormatted}</th>`;
                } else {
                    routineOutput += `<th>${timeSlots[i - 1].startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${timeSlots[i - 1].endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</th>`;
                }
            }
            routineOutput += `</tr></thead><tbody>`;

            // Generate routine for each selected day
            selectedDaysOpen.forEach(day => {
                routineOutput += `<tr><td>${day}</td>`;
                for (let i = 0; i < totalPeriods; i++) {
                    if (timeSlots[i].startTime.getTime() === breakStartTime.getTime() && timeSlots[i].endTime.getTime() === breakEndTime.getTime()) {
                        routineOutput += `<td>BREAK</td>`;
                    } else {
                        // Use each selected subject-teacher combination in order
                        const index = (selectedDaysOpen.indexOf(day) * totalPeriods + i) % selectedPairs.length;
                        const selectedPair = selectedPairs[index];
                        routineOutput += `<td>${selectedPair.subject}/${selectedPair.teacher}</td>`;
                    }
                }
                routineOutput += `</tr>`;
            });

            routineOutput += `</tbody></table>`;
            document.getElementById("routineOutput").innerHTML = routineOutput;
        });

