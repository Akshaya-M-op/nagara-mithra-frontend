const defaultFieldWorkerTasks = [
  {
    id: "TASK-001",
    complaintId: "CIV-00125",
    title: "Clear drainage blockage",
    category: "Drainage blockage",
    description:
      "Clear the blocked drain near the Government School entrance and check water flow.",
    ward: "Ward 12",
    location: "Near Government School",
    department: "Drainage",
    priority: "high",
    status: "assigned",
    assignedDate: "Today, 12:30 PM",
    dueDate: "Today, 6:00 PM",
    officerName: "Demo Officer",
    citizenDescription:
      "Blocked drain is causing stagnant water near the school entrance.",
    evidence: {
      beforePhoto: "",
      afterPhoto: "",
      notes: "",
    },
    updates: [
      {
        title: "Task assigned",
        description:
          "The officer assigned this task to you.",
        time: "Today, 12:30 PM",
        completed: true,
      },
      {
        title: "Work started",
        description:
          "Waiting for field-worker confirmation.",
        time: "Pending",
        completed: false,
      },
      {
        title: "Work completed",
        description:
          "Upload before and after proof after completing the work.",
        time: "Pending",
        completed: false,
      },
    ],
  },

  {
    id: "TASK-002",
    complaintId: "CIV-00131",
    title: "Inspect dangerous pothole",
    category: "Road damage",
    description:
      "Inspect the pothole on Main Bus Road and place a temporary safety marker.",
    ward: "Ward 8",
    location: "Main Bus Road",
    department: "Roads",
    priority: "high",
    status: "in_progress",
    assignedDate: "Yesterday, 3:10 PM",
    dueDate: "Today, 5:00 PM",
    officerName: "Demo Officer",
    citizenDescription:
      "Large pothole creating a danger for two-wheelers and buses.",
    evidence: {
      beforePhoto: "",
      afterPhoto: "",
      notes: "",
    },
    updates: [
      {
        title: "Task assigned",
        description:
          "The officer assigned this task to you.",
        time: "Yesterday, 3:10 PM",
        completed: true,
      },
      {
        title: "Work started",
        description:
          "You marked this task as in progress.",
        time: "Today, 9:20 AM",
        completed: true,
      },
      {
        title: "Work completed",
        description:
          "Upload before and after proof after completing the work.",
        time: "Pending",
        completed: false,
      },
    ],
  },
];

function normalizeTask(task) {
  return {
    ...task,

    evidence: {
      beforePhoto: task.evidence?.beforePhoto || "",
      afterPhoto: task.evidence?.afterPhoto || "",
      notes: task.evidence?.notes || "",
    },

    updates: Array.isArray(task.updates)
      ? task.updates
      : [],
  };
}

function loadFieldWorkerTasks() {
  try {
    const savedTasks = localStorage.getItem(
      "fieldWorkerTasks"
    );

    if (!savedTasks) {
      return defaultFieldWorkerTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return defaultFieldWorkerTasks;
    }

    return parsedTasks.map(normalizeTask);
  } catch (error) {
    console.error(
      "Unable to load field-worker tasks:",
      error
    );

    return defaultFieldWorkerTasks;
  }
}

export const fieldWorkerTasks = loadFieldWorkerTasks();

export function saveFieldWorkerTasks(tasks) {
  const normalizedTasks = tasks.map(normalizeTask);

  localStorage.setItem(
    "fieldWorkerTasks",
    JSON.stringify(normalizedTasks)
  );
}