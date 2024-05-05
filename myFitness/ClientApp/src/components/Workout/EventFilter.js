export const fetchAllRecentEvents = async (UserId, setLoading, dayjs) => {
    const weekStartDate = dayjs().startOf('week').valueOf();
    const weekEndDate = dayjs().endOf('week').valueOf();

    try {
        const response = await fetch("api/event");
        if (!response.ok) {
            setLoading(false);
            return [];
        }
        const events = await response.json();
        const filteredEvents = events.filter(event => {
            const eventCreatedOn = dayjs(event.createdOn).valueOf();
            const isWithinWeek = eventCreatedOn >= weekStartDate && eventCreatedOn <= weekEndDate;
            const createdByCurrentUser = event.createdBy !== UserId;
            return isWithinWeek && createdByCurrentUser && !event.registrations.some(registration => registration.userId === UserId);
        }).slice(0, 5);

        return filteredEvents;
    } catch (error) {
        console.error("Error fetching or filtering events:", error);
        return [];
    }
};

export const fetchSuggestedInterestBasedEvent = async (userInterests,UserId, setLoading, dayjs) => {
    const weekStartDate = dayjs().startOf('week').valueOf();
    const weekEndDate = dayjs().endOf('week').valueOf();

    try {
        const response = await fetch("api/event");
        if (!response.ok) {
            setLoading(false);
            return [];
        }
        const events = await response.json();
        const filteredEvents = events.filter(event => {
            if (!userInterests?.includes(event.category)) {
                return false;
            }
            const eventCreatedOn = dayjs(event.createdOn).valueOf();
            const isWithinWeek = eventCreatedOn >= weekStartDate && eventCreatedOn <= weekEndDate;
            const createdByCurrentUser = event.createdBy !== UserId;
            return isWithinWeek && createdByCurrentUser && !event.registrations.some(registration => registration.userId === UserId);
        }).slice(0, 5);

        return filteredEvents;
    } catch (error) {
        console.error("Error fetching or filtering events:", error);
        return [];
    }
};
