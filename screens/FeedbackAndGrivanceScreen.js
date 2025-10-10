import React, { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, View, FlatList, ScrollView, Alert, Image } from 'react-native';

// Added Image and Chip for simulated image preview
import { Avatar, Card, Text, Button, Modal, Portal, TextInput, Divider, IconButton, Provider, Chip } from 'react-native-paper'; 

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useRoute } from '@react-navigation/native'; // Hook to access navigation parameters


// --- Static Data Definitions ---

const DEPARTMENTS = ['Administration', 'Engineering', 'Education', 'Health', 'Finance', 'Local Governance'];

const GRIEVANCE_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];


// Initial dummy data for display - UPDATED to include 'department' and 'imageUri'
const initialFeedback = [
    { id: 'f1', municipality: 'Kamalamai Municipality', rating: 5, comment: 'Excellent waste collection service this month.', date: '2025-09-01', department: 'Administration', imageUri: null },
    { id: 'f2', municipality: 'Dudhauli Municipality', rating: 4, comment: 'Pothole repair was quick and effective.', date: '2025-09-15', department: 'Engineering', imageUri: null },
];

const initialGrievance = [
    // Added a dummy imageUri to the grievance data
    { id: 'g1', title: 'Street Light Outage', description: 'Street light broken on main road near Ward 2 office.', status: 'In Progress', date: '2025-10-01', department: 'Engineering', imageUri: 'https://picsum.photos/seed/grievance1/200/300' },
];


// --- Shared Utility Components ---


/** Renders a simple star rating display */
const StarRating = ({ rating }) => (
    <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
                key={star}
                icon={star <= rating ? 'star' : 'star-outline'}
                iconColor={star <= rating ? '#FFC107' : '#CCC'}
                size={20}
                style={{ margin: 0, padding: 0 }}
                onPress={() => {}}
            />
        ))}
    </View>
);


// --- Main Component ---


const FeedbackAndGrivanceScreen = ({ navigation }) => {
    const route = useRoute();
    // Retrieve dynamic data from the district screens
    const { districtName, municipalities: initialMunicipalities } = route.params || { districtName: 'District', municipalities: [] };

    const [activeTab, setActiveTab] = useState('Feedback');
    const [feedbackList, setFeedbackList] = useState(initialFeedback);
    const [grievanceList, setGrievanceList] = useState(initialGrievance);
    
    // Feedback Modal State - ADDED feedbackDepartment and feedbackImageUri
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState(initialMunicipalities.length > 0 ? initialMunicipalities[0] : '');
    const [feedbackComment, setFeedbackComment] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackDepartment, setFeedbackDepartment] = useState(DEPARTMENTS[0]); // NEW
    const [feedbackImageUri, setFeedbackImageUri] = useState(null); // NEW

    // Grievance Modal State - ADDED grievanceImageUri
    const [isGrievanceVisible, setIsGrievanceVisible] = useState(false);
    const [grievanceTitle, setGrievanceTitle] = useState('');
    const [grievanceDescription, setGrievanceDescription] = useState('');
    const [grievanceDepartment, setGrievanceDepartment] = useState(DEPARTMENTS[0]);
    const [grievanceImageUri, setGrievanceImageUri] = useState(null); // NEW

    // Selector Modal State
    const [isMunicipalitySelectorVisible, setIsMunicipalitySelectorVisible] = useState(false);
    // Renamed for clarity to distinguish between Feedback and Grievance Department Selectors
    const [isFeedbackDepartmentSelectorVisible, setIsFeedbackDepartmentSelectorVisible] = useState(false); // NEW for Feedback
    const [isGrievanceDepartmentSelectorVisible, setIsGrievanceDepartmentSelectorVisible] = useState(false); // Existing for Grievance


    // Effect to update selected municipality when the list changes
    useEffect(() => {
        if (initialMunicipalities.length > 0 && !selectedMunicipality) {
            setSelectedMunicipality(initialMunicipalities[0]);
        }
    }, [initialMunicipalities, selectedMunicipality]);

    const showFeedbackModal = () => setIsFeedbackVisible(true);
    const hideFeedbackModal = () => {
        // Reset feedback state on dismiss
        setFeedbackComment('');
        setFeedbackRating(0);
        setFeedbackDepartment(DEPARTMENTS[0]);
        setFeedbackImageUri(null);
        setIsFeedbackVisible(false);
    }
    
    const showGrievanceModal = () => setIsGrievanceVisible(true);
    const hideGrievanceModal = () => {
        // Reset grievance state on dismiss
        setGrievanceTitle('');
        setGrievanceDescription('');
        setGrievanceDepartment(DEPARTMENTS[0]);
        setGrievanceImageUri(null);
        setIsGrievanceVisible(false);
    }

    // NEW: Function to simulate image picking
    const pickImage = (setImageUri) => {
        Alert.prompt(
            "Add Image (Simulated)",
            "Enter a placeholder image URL (e.g., https://picsum.photos/200/300):",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: (url) => {
                        if (url) {
                            setImageUri(url);
                        }
                    }
                }
            ],
            "plain-text",
            "https://picsum.photos/200/300" // Default URL for convenience
        );
    };

    const submitFeedback = () => {
        if (feedbackRating === 0 || !feedbackComment || !selectedMunicipality || !feedbackDepartment) { // Added feedbackDepartment check
            Alert.alert("Missing Information", "Please provide a rating, select a municipality and department, and enter a comment.");
            return;
        }

        const newFeedback = {
            id: `f${Date.now()}`,
            municipality: selectedMunicipality,
            rating: feedbackRating,
            comment: feedbackComment,
            date: new Date().toISOString().split('T')[0],
            department: feedbackDepartment, // UPDATED
            imageUri: feedbackImageUri, // NEW
        };

        setFeedbackList([newFeedback, ...feedbackList]);
        hideFeedbackModal(); // Resets state inside hideModal
    };

    const submitGrievance = () => {
        if (!grievanceTitle || !grievanceDescription || !grievanceDepartment) {
            Alert.alert("Missing Information", "Please fill all fields and select a department.");
            return;
        }

        const newGrievance = {
            id: `g${Date.now()}`,
            title: grievanceTitle,
            description: grievanceDescription,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            department: grievanceDepartment, // Already existed, but ensures it's set
            imageUri: grievanceImageUri, // NEW
        };

        setGrievanceList([newGrievance, ...grievanceList]);
        hideGrievanceModal(); // Resets state inside hideModal
    };


    // UPDATED renderFeedbackItem to show Department and Image
    const renderFeedbackItem = ({ item }) => (
        <Card mode="outlined" style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.municipality}</Text>
                    <Chip style={styles.departmentChip} mode="outlined" textStyle={{ fontSize: 10 }}>{item.department}</Chip> 
                </View>
                <StarRating rating={item.rating} />
                <Text style={styles.itemDate}>Submitted on: {item.date}</Text>
                <Text variant="bodyMedium" style={{ marginBottom: item.imageUri ? 10 : 0 }}>{item.comment}</Text>
                {item.imageUri && (
                    <Card style={styles.imagePreviewContainer}>
                        {/* Note: This uses a very basic Image component. In a real app, you'd use a dedicated Image component with proper error handling and resizing. */}
                        <Text variant="labelSmall" style={styles.imageLabel}>Attached Photo:</Text>
                        <Image source={{ uri: item.imageUri }} style={styles.itemImage} resizeMode="cover" />
                    </Card>
                )}
            </Card.Content>
        </Card>
    );

    // UPDATED renderGrievanceItem to show Image and Department
    const renderGrievanceItem = ({ item }) => (
        <Card mode="outlined" style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Chip style={styles.departmentChip} mode="outlined" textStyle={{ fontSize: 10 }}>{item.department}</Chip>
                </View>
                <Text style={styles.itemDate}>
                    Status: <Text style={{ color: item.status === 'Resolved' ? 'green' : (item.status === 'Open' ? 'red' : 'orange') }}>{item.status}</Text>
                </Text>
                <Text variant="bodyMedium" style={{ marginBottom: item.imageUri ? 10 : 0 }}>{item.description}</Text>
                {item.imageUri && (
                    <Card style={styles.imagePreviewContainer}>
                        <Text variant="labelSmall" style={styles.imageLabel}>Attached Proof:</Text>
                        <Image source={{ uri: item.imageUri }} style={styles.itemImage} resizeMode="cover" />
                    </Card>
                )}
            </Card.Content>
        </Card>
    );

    const renderSelectorList = (list, selectedValue, onSelect, hideModal) => (
        <ScrollView style={styles.selectorContent}>
            {list.map((value, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.selectOption}
                    onPress={() => {
                        onSelect(value);
                        hideModal();
                    }}
                >
                    <Text style={{ fontWeight: value === selectedValue ? 'bold' : 'normal', color: value === selectedValue ? '#303f9f' : '#333' }}>
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );


    return (
        <SafeAreaProvider>
            <Provider>
                <SafeAreaView style={styles.container}>
                    
                    <Text variant="headlineSmall" style={styles.title}>
                        {districtName} Feedback Hub
                    </Text>
                    
                    <View style={styles.tabContainer}>
                        <Button 
                            mode={activeTab === 'Feedback' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Feedback')}
                            style={styles.tabButton}
                        >
                            Feedback ({feedbackList.length})
                        </Button>
                        <Button 
                            mode={activeTab === 'Grievance' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Grievance')}
                            style={styles.tabButton}
                        >
                            Grievances ({grievanceList.length})
                        </Button>
                    </View>

                    <View style={styles.actionRow}>
                        <Button 
                            mode="contained" 
                            icon={activeTab === 'Feedback' ? 'plus' : 'alert-circle-outline'}
                            onPress={activeTab === 'Feedback' ? showFeedbackModal : showGrievanceModal}
                            style={styles.actionButton}
                        >
                            {activeTab === 'Feedback' ? 'Submit Feedback' : 'Report Grievance'}
                        </Button>
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.listTitle}>{activeTab} History</Text>
                    
                    {activeTab === 'Feedback' ? (
                        <FlatList
                            data={feedbackList}
                            renderItem={renderFeedbackItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No feedback submitted yet for {districtName}.</Text>}
                        />
                    ) : (
                        <FlatList
                            data={grievanceList}
                            renderItem={renderGrievanceItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No grievances reported yet for {districtName}.</Text>}
                        />
                    )}
                </SafeAreaView>

                {/* --- Feedback Submission Modal --- */}
                <Portal>
                    <Modal visible={isFeedbackVisible} onDismiss={hideFeedbackModal} contentContainerStyle={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Submit Feedback for {districtName}</Text>
                            
                            {/* Municipality Selector */}
                            <TextInput
                                label="Municipality"
                                value={selectedMunicipality}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsMunicipalitySelectorVisible(true)} />}
                                editable={false}
                            />
                            
                            {/* NEW: Department Selector for Feedback */}
                            <TextInput
                                label="Department to review"
                                value={feedbackDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsFeedbackDepartmentSelectorVisible(true)} />}
                                editable={false}
                            />

                            {/* Rating */}
                            <Text style={styles.ratingText}>Rate the services:</Text>
                            <View style={styles.ratingRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IconButton
                                        key={star}
                                        icon={star <= feedbackRating ? 'star' : 'star-outline'}
                                        iconColor={star <= feedbackRating ? '#FFC107' : '#CCC'}
                                        size={30}
                                        onPress={() => setFeedbackRating(star)}
                                    />
                                ))}
                            </View>

                            {/* Comment Input */}
                            <TextInput
                                label="Your Comment"
                                placeholder="Share your experience and suggestions..."
                                value={feedbackComment}
                                onChangeText={setFeedbackComment}
                                mode="outlined"
                                multiline
                                numberOfLines={4}
                                style={{ marginBottom: 20 }}
                            />
                            
                            {/* NEW: Image Upload Option for Feedback */}
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setFeedbackImageUri)}
                                    style={styles.imageButton}
                                >
                                    {feedbackImageUri ? 'Change Photo' : 'Add Photo (Optional)'}
                                </Button>
                                {feedbackImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setFeedbackImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={submitFeedback} style={styles.modalButton}>
                                Submit Feedback
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                
                {/* --- Municipality Selector Modal (Re-usable) --- */}
                <Portal>
                    <Modal visible={isMunicipalitySelectorVisible} onDismiss={() => setIsMunicipalitySelectorVisible(false)} contentContainerStyle={styles.modalContainer}>
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Municipality</Text>
                        {renderSelectorList(
                            initialMunicipalities, 
                            selectedMunicipality, 
                            setSelectedMunicipality, 
                            () => setIsMunicipalitySelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                {/* NEW: Department Selector Modal for Feedback */}
                <Portal>
                    <Modal visible={isFeedbackDepartmentSelectorVisible} onDismiss={() => setIsFeedbackDepartmentSelectorVisible(false)} contentContainerStyle={styles.modalContainer}>
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            feedbackDepartment, 
                            setFeedbackDepartment, 
                            () => setIsFeedbackDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                {/* --- Grievance Submission Modal --- */}
                <Portal>
                    <Modal visible={isGrievanceVisible} onDismiss={hideGrievanceModal} contentContainerStyle={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Report Grievance for {districtName}</Text>
                            
                            {/* Title Input */}
                            <TextInput
                                label="Grievance Title (e.g., Water Shortage, Road Damage)"
                                value={grievanceTitle}
                                onChangeText={setGrievanceTitle}
                                mode="outlined"
                                style={styles.fixedInput}
                            />
                            
                            {/* Department Selector */}
                            <TextInput
                                label="Relevant Department"
                                value={grievanceDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsGrievanceDepartmentSelectorVisible(true)} />} // Used the dedicated selector state
                                editable={false}
                            />

                            {/* Description Input */}
                            <TextInput
                                label="Detailed Description"
                                placeholder="Provide location, date, and other relevant details..."
                                value={grievanceDescription}
                                onChangeText={setGrievanceDescription}
                                mode="outlined"
                                multiline
                                numberOfLines={5}
                                style={{ marginBottom: 20 }}
                            />
                            
                            {/* NEW: Image Upload Option for Grievance */}
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setGrievanceImageUri)}
                                    style={styles.imageButton}
                                >
                                    {grievanceImageUri ? 'Change Photo' : 'Add Photo (Proof)'}
                                </Button>
                                {grievanceImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setGrievanceImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={submitGrievance} style={styles.modalButton}>
                                Submit Grievance
                            </Button>
                        </View>
                    </Modal>
                </Portal>

                {/* --- Department Selector Modal for Grievance (Re-used for Feedback as well now) --- */}
                <Portal>
                    <Modal visible={isGrievanceDepartmentSelectorVisible} onDismiss={() => setIsGrievanceDepartmentSelectorVisible(false)} contentContainerStyle={styles.modalContainer}>
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            grievanceDepartment, 
                            setGrievanceDepartment, 
                            () => setIsGrievanceDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>
            </Provider>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    divider: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20, 
    },
    listItem: {
        marginVertical: 6,
        borderRadius: 10,
        elevation: 1,
    },
    itemHeader: { // NEW: Style for title/department alignment
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemTitle: {
        fontWeight: 'bold',
        color: '#303f9f',
        flexShrink: 1,
    },
    departmentChip: { // NEW: Style for department chip
        height: 20,
        marginLeft: 8,
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    itemImage: { // NEW: Style for displaying image in list
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    imagePreviewContainer: { // NEW: Card style for the image preview
        marginTop: 10,
        marginBottom: 5,
        padding: 5,
    },
    imageLabel: { // NEW: Label above the image
        marginBottom: 5,
        color: '#555',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '90%',
        zIndex: 1000,
    },
    modalContent: {
        padding: 10,
    },
    selectorContent: { // NEW: Separate style for selector scrollview to contain padding
        padding: 10,
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    fixedInput: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    ratingText: {
        marginTop: 8,
        marginBottom: 4,
        fontWeight: '500',
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
        marginLeft: -12, 
    },
    imageUploadRow: { // NEW: Container for the image button and chip
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    imageButton: { // NEW: Style for the image selection button
        marginRight: 10,
    },
    imageChip: { // NEW: Style for the image attached chip
        backgroundColor: '#e8f5e9',
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 4,
    },
    listTitle: {
        marginTop: 20, 
        marginBottom: 10, 
        fontWeight: 'bold',
        color: '#444',
        paddingHorizontal: 16,
    },
    selectOption: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
});

export default FeedbackAndGrivanceScreen;